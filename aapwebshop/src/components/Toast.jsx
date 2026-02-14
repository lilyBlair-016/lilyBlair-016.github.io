import '../css/toast.css';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast-notification" role="alert" aria-live="polite">
      {message}
    </div>
  );
}
