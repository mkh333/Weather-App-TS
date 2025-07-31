import { useState } from "react";
import Button from "./Button";
import type { ReactNode } from "react";

type ModalProps = {
    title: string;
    content: string;
    children?: ReactNode;
    trigger: ReactNode;
    city: string;
    removeCity: (city: string) => void;
}

const Modal = ({ title, content, children, trigger, city, removeCity}: ModalProps) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <span onClick={() => setVisible(true)}>{trigger}</span>
            {visible && (
                <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-md shadow-md w-80 p-6">
                        <h2 className="text-lg font-semibold mb-4">{title}</h2>
                        <p className="text-sm text-gray-700">{content}</p>
                        <div className="flex justify-center gap-2 mt-6">
                            {children ? children : (
                                <>
                                    <Button type="secondary" size="small" onClick={() => setVisible(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="primary" size="small" onClick={() => removeCity(city)}>
                                        Confirm
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal
