import React from "react";
import HungerHeader from "./HungerHeader";
import db from "../../db";
import { addDoc, collection } from "firebase/firestore";

function hungerRelief() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cause: "",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  function handleChange(e) {
    const field = e.target.name;
    const value = e.target.value;

    setForm((values) => {
      return { ...values, [field]: value };
    });

    console.log(form);
  }

  async function submit(e) {
    e.preventDefault();

    setIsSubmitting(true);

    await addDoc(collection(db, "Donations"), {
      name: form.name,
      email: form.email,
      phoneNumber: form.phone,
      cause: form.cause,
      address: form.address,
    });

    setIsSubmitting(false);
  }

  return (
    <div>
      <HungerHeader/>
      <div className="form-div">
        <form onSubmit={submit}>
          <div className="form-row">
            <div className="form col-12">
              <label for="inputEmail4">Full Name</label>
              <input
                onChange={(e) => handleChange(e)}
                name="name"
                type="text"
                className="form-control"
                id="inputname4"
                placeholder="Enter Your Full Name"
              />
            </div>
            <div className="form col-12">
              <label for="inputPassword4">Email Address</label>
              <input
                onChange={(e) => handleChange(e)}
                name="email"
                type="email"
                className="form-control"
                id="inputemail4"
                placeholder="Enter Your Email"
              />
            </div>
          </div>
          <div className="form-group">
            <label for="inputAddress2">Address</label>
            <input
              onChange={(e) => handleChange(e)}
              name="address"
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputCity">Phone Number</label>

              <input
                name="phone"
                type="text"
                className="form-control"
                id="inputPhone"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group col-md-4">
              <label for="inputCause">Causes</label>
              <select
                name="cause"
                id="inputCause"
                className="form-control"
                onChange={(e) => handleChange(e)}
              >
                <option selected>Select Cause</option>
                <option value="General Pool">General Pool</option>
                <option value="Hunger Relief">Hungry Relief</option>
                <option value="Help the Ill">Help the ill</option>
                <option value="Education">Education</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {!isSubmitting && "Donate Now"}
            {isSubmitting && "Submitting"}
          </button>
        </form>
      </div>
      <footer className="HungerFooter">©Sadaqa-2023</footer>
    </div>
  );
}

export default hungerRelief;
