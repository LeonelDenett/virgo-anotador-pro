// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastifyContainer() {
    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                closeOnClick={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <style global jsx>{`
                :root {
                    --toastify-font-family: Bungee Inline;
                }
            `}</style>
        </>
    );
}

export default ToastifyContainer;