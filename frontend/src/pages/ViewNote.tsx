import { useEffect, useState, lazy } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { CiShare1 } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
const LoadingSpinner = lazy(() => import("../components/Loading.tsx"));
import { getSession } from "../state/userSlice.ts";
import AlertModal from '../components/AlertModal.tsx';
import { AnimatePresence, motion } from "framer-motion";
import { fade } from "../variant/variant.ts";

const ViewNote = () => {
    const [noteDetail, setNoteDetail] = useState({});
    const [date, setDate] = useState("");

    const [copied, setCopied] = useState(false);
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { userDetail } = useSelector(state => state.user);

    const { id } = useParams();

    useEffect(() => {
        const getNoteDetail = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/note/one/${id}`
                );
                
                setNoteDetail(res?.data?.note);

                const [year, month, date] = res.data.note.createdAt
                    .split("T")[0]
                    .split("-")
                    .map(Number);

                const months = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ];

                setDate(`${months[month - 1]} ${date}, ${year}`);
            } catch (e) {
                console.log("getNoteDetail", {e})
            }
        };
        getNoteDetail();
        dispatch(getSession());
    }, [id]);

    useEffect(() => {
        if (
            Object.keys(userDetail).length > 0 &&
            Object.keys(noteDetail.length > 0) &&
            noteDetail?.to === userDetail?.username
        ) {
            if (!noteDetail?.read) {
                const readNote = async () => {
                    await axios.put(
                        `${
                            import.meta.env.VITE_BACKEND_URL
                        }/api/update/${noteDetail?._id}`,
                        {}
                    );
                };
                readNote();
            }
        }
    }, [noteDetail]);

    const shareLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    if (Object.keys(noteDetail).length > 0 && date && id) {
        return (
            <motion.div
                variants={fade}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="container d-flex flex-column justify-content-start align-items-center"
            >
                <AnimatePresence>
                    {copied && (
                        <AlertModal
                            message="Your link is ready to share"
                            color="primary"
                        />
                    )}
                </AnimatePresence>
                <div className="vstack gap-2 gloria-font my-4 p-4 text-light text-center">
                    <h1 className="mt-4">Message sent to {noteDetail?.to}</h1>
                    <div className="justify-content-center hstack gap-4">
                        <h6 className="mb-0 opacity-75"> Sent on {date}</h6>
                        <CiShare1 onClick={shareLink} />
                    </div>
                </div>
                <div className="mb-5 min-vh-50 w-75 text-light text-start gloria-font">
                    {noteDetail?.message}
                </div>
                { userDetail?.username !== noteDetail?.to && <NavLink
                    to={`/u/${noteDetail?.to}`}
                    className="btn z-3 text-truncate w-75 btn-outline-light"
                >
                    Send {noteDetail?.to} a note!
                </NavLink> }
            </motion.div>
        );
    } else {
        return <LoadingSpinner />;
    }
};

export default ViewNote;
