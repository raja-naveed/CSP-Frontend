const FAQ = () => {
  return (
    <>
      <div className="container-fluid bg-dark-gray my-md-3 p-md-3 p-2 mb-3">
        <div className="row align-items-center g-0">
          <div className="col-md-1 col-2">
            <img
              src={require("../assets/images/customization-pg.png")}
              alt="alt-text"
              className="img-fluid"
            />
          </div>
          <div className="col-md-11 col-10">
            <h1 className="fw-bold text-white mb-0">Add FAQs</h1>
          </div>
        </div>
      </div>

      <div className="container p-md-5">
        <div className="bg-white rounded-4">
          <div className="bg-gray rounded-4 p-2 mb-3">
            <h1>Frequently Asked Questions</h1>
          </div>
          <form action="">
            <div className="row p-3">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="add_question" className="form-label h4">
                    Add Questions & Answers for NGO’s & Volunteers.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add a question: i.e. How to register on ALFAWZ?"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="7"
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div className="col-md-3 ms-auto">
                <div className="row">
                  <div className="col-md-7">
                    <div className="mb-3">
                      <button className="btn btn-outline-dark w-100 text-uppercase">
                        CANCEL
                      </button>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="mb-3">
                      <button className="btn btn-primary w-100 text-uppercase">
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FAQ;
