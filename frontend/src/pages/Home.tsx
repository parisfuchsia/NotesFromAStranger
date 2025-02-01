import { useState, useEffect, lazy } from "react";
import Mail from "../components/Mail.tsx";
import { Navigate } from "react-router-dom";
import { getSession, returnError } from "../state/userSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const ErrorModal = lazy(() => import("../components/ErrorModal.tsx"));
import LoadingSpinner from "../components/Loading.tsx";
import AlertModal from "../components/AlertModal.tsx";
import LogoutModal from "../components/LogoutConfirmation.tsx";
import { AnimatePresence, motion } from "framer-motion";

import { CiShare1, CiLogout } from "react-icons/ci";
import { fade } from "../variant/variant.ts";

const Home = () => {
    const dispatch = useDispatch();
    const { userDetail, loading, error } = useSelector(state => state.user);
    const [copied, setCopied] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [unread, setUnread] = useState(0);
    const [isNotesPending, setIsNotesPending] = useState(false);

    useEffect(() => {
        if (Object.keys(userDetail).length === 0) {
            dispatch(getSession());
            setIsNotesPending(true);
        }
    }, [dispatch]);

    useEffect(() => {
        if (Object.keys(userDetail).length > 0) {
            const getAllNotes = async () => { 
              try{
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/api/note/all/${userDetail?.username}`
                );

                if (res?.data?.notes) {
                    setNotes(res.data.notes);
                    const unreadNotes = res.data.notes.filter(
                        note => !note.read
                    );
                    setUnread(unreadNotes.length);
                    setIsNotesPending(false);
                }
            }catch(e){
              dispatch(returnError());
            }
            }
                getAllNotes();
        }
    }, [userDetail, dispatch]);

    const shareLink = () => {
        const linkFormat = `${
            import.meta.env.VITE_FRONTEND_URL
        }/u/${userDetail?.username}`;
        navigator.clipboard.writeText(linkFormat);
        setCopied(true);
        const timeout = setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    if (error) {
        return <Navigate to="/login" replace />;
    }

    if (Object.keys(userDetail).length > 0 && !loading) {
        return (
            <div>
                <AnimatePresence>
                    {isLogoutModalOpen && (
                        <LogoutModal
                            name={userDetail.username}
                            open={isLogoutModalOpen}
                            onClose={() => setIsLogoutModalOpen(false)}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {copied && (
                        <AlertModal
                            message="Your link is ready to share"
                            color="primary"
                        />
                    )}
                </AnimatePresence>
                <nav className="navbar bg-dark navbar-dark  d-flex align-items-center justify-content-between px-4  navbar-expand w-100 ">
                    <h1 className="navbar-brand gloria-font mb-0">
                        NotesFromAStranger
                    </h1>
                    <ul className="navbar-nav hstack gap-2">
                        <li className="nav-item">
                            <CiShare1
                                className="text-light"
                                onClick={shareLink}
                            />
                        </li>
                        <li className="nav-item">
                            <p className="mb-0 nav-link">
                                {userDetail?.username}
                            </p>{" "}
                        </li>
                        <li className="nav-item">
                            <CiLogout
                                className="text-light"
                                onClick={() => setIsLogoutModalOpen(true)}
                            />
                        </li>
                    </ul>
                </nav>
                <main className="container d-flex flex-column justify-content-center align-items-center gap-4 my-5">
                    <div className="gloria-font vstack gap-2 align-items-center text-light">
                        <h1>NotesFromAStranger</h1>
                        <h5 className="opacity-75">
                            You received a total of {notes.length} note(s)
                        </h5>
                        <h5 className="opacity-75">{unread} unread(s)</h5>
                    </div>
                    {!isNotesPending && (
                        <motion.div
                            variants={fade}
                            initial="hidden"
                            animate="visible"
                            className="row w-75 py-4 rounded-5 overflow-hidden  bg-dark-ultra mx-4"
                        >
                            {notes && notes.length > 0
                                ? notes
                                      .slice()
                                      .reverse()
                                      .map(mail => <Mail mail={mail} />)
                                : !isNotesPending && (
                                      <div>
                                          <p className="text-center text-light gloria-font">
                                              Nothing to see here...
                                          </p>
                                          <p className="text-center text-light gloria-font opacity-75">
                                              Share your link to receive
                                              messages!
                                          </p>
                                      </div>
                                  )}
                        </motion.div>
                    )}
                </main>
            </div>
        );
    } else {
        return <LoadingSpinner />;
    }
};

export default Home;
