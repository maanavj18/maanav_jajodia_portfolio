export function RegistrationMark() {
  return (
    <span className="reg">
      <svg className="reg-layer reg-pink" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.6" />
        <path d="M12 1.5v21M1.5 12h21" fill="none" stroke="currentColor" strokeWidth="2.6" />
      </svg>
      <svg className="reg-layer reg-blue" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.6" />
        <path d="M12 1.5v21M1.5 12h21" fill="none" stroke="currentColor" strokeWidth="2.6" />
      </svg>
    </span>
  );
}

export function SheetMarks() {
  return (
    <div className="marks" aria-hidden="true">
      <RegistrationMark />
      <RegistrationMark />
      <RegistrationMark />
      <RegistrationMark />
    </div>
  );
}
