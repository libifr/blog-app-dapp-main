import { createPortal } from "react-dom";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  const portalContainer = document.getElementById("portal-root");

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-md shadow-lg p-4">
        <p className="mb-4">Are you sure you want to delete?</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white text-sm px-4 py-2 mr-2 rounded-md"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="bg-gray-500 text-white text-sm px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    portalContainer
  );
}

export default ConfirmDeleteModal;
