import React from 'react';
import ReactDom from 'react-dom';
import IF from './IF';

function Modal({ isOpen, children, title, hasCloseButton = true, handleClose, appearsTop }) {
    return ReactDom.createPortal(
        <>
            {isOpen ? (
                <div
                    role="button"
                    onClick={handleClose}
                    tabIndex={0}
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50"
                >
                    <div
                        role="button"
                        tabIndex={0}
                        style={{ maxWidth: '700px', maxHeight: '90vh' }}
                        onClick={(e) => e.stopPropagation()}
                        className={`fixed bg-white w-auto h-auto max-h-screen	 left-1/2 transform -translate-x-1/2 sm:w-2/3 max-w-48 w-full cursor-default ${appearsTop ? '-translate-y-1/3 top-1/4' : ' top-1/2 -translate-y-1/2 '
                            }`}
                    >
                        <div className="p-4 flex justify-between ">
                            <p className="text-lg font-semibold">{title}</p>
                            <IF condition={hasCloseButton}>
                                <i
                                    className="csra-close-solid cursor-pointer"
                                    role="button"
                                    tabIndex={0}
                                    onClick={handleClose}
                                />
                            </IF>
                        </div>
                        <hr className="bg-gray-100 h-0.5 w-full mx-auto" />
                        <div className="p-5 ">{children}</div>
                    </div>
                </div>
            ) : null}
        </>,
        document?.getElementById('portal')
    );
}

Modal.defaultProps = {
    isOpen: false,
    children: <></>,
    title: 'Modal',
    hasCloseButton: true,
    appearsTop: false,
};

export default Modal;
