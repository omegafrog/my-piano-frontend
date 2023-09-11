function OrganizationSelection({ setSheetInfo }) {
  const changeOrganization = (event) => {
    console.log("event", event);
    console.log("event.target:", event.target);
    setSheetInfo((prev) => ({
      ...prev,
      sheetDto: {
        ...prev.sheetDto,
        isSolo: event.target.value,
      },
    }));
  };
  return (
    <div className="btn-group" role="group" aria-label="organization">
      <input
        type="radio"
        name="organization"
        className="btn-check"
        autoComplete="off"
        id={`organization${1}`}
        value={1}
        onClick={changeOrganization}
      />
      <label htmlFor={`organization${1}`} className="btn btn-primary">
        {"솔로"}
      </label>

      <input
        type="radio"
        name="organization"
        className="btn-check"
        autoComplete="off"
        id={`organization${0}`}
        value={0}
        onClick={changeOrganization}
      />
      <label htmlFor={`organization${0}`} className="btn btn-primary">
        {"듀엣"}
      </label>
    </div>
  );
}
export default OrganizationSelection;
