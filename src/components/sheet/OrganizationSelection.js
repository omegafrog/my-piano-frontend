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
    <div className="w-100 m-2">
      <h3>편성</h3>
      <div className="btn-group" role="group" aria-label="organization">
        <input
          type="radio"
          name="organization"
          className="btn-check"
          autoComplete="off"
          id={`organization${1}`}
          value={true}
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
          value={false}
          onClick={changeOrganization}
        />
        <label htmlFor={`organization${0}`} className="btn btn-primary">
          {"듀엣"}
        </label>
      </div>
    </div>
  );
}
export default OrganizationSelection;
