import * as yup from "yup";

import { Link } from "react-router-dom";
import { Notyf } from "notyf";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  repeatedPassword: yup
    .string()
    .required("password confirmation is required ")
    .oneOf([yup.ref("password"), null], "password does not match"),
});
const Register = () => {
  const history = useHistory();
  /* GETTING DATA */
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: "center",
      y: "top",
    },
  });
  const onSubmit = (data) => {
    Meteor.call("addUserToDB", data, (err) => {
      if (err) {
        notyf.error({ message: "email already exists" });
        history.push("/register");
      }
    });
    history.push("/");
  };
  return (
    <div className="container full-height">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title h3 mb-0">Registration Form</h3>
            </div>

            <form
              className="card-body"
              id="register"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-group row">
                <label className="form-label"> First Name : </label>
                <input
                  type="text"
                  className="form-control form-control-rounded mb-2"
                  name="firstName"
                  placeholder="first name"
                  ref={register}
                />
                {errors.firstName && (
                  <div class="alert alert-danger" role="alert">
                    <div class="d-flex">
                      <div>
                        <div class="text-muted">
                          {" "}
                          {errors.firstName?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="form-group row">
                <label className="form-label">Last Name : </label>
                <input
                  type="text"
                  className="form-control form-control-rounded mb-2"
                  name="lastName"
                  placeholder="last name"
                  ref={register}
                />
                {errors.lastName && (
                  <div class="alert alert-danger" role="alert">
                    <div class="d-flex">
                      <div>
                        <div class="text-muted">
                          {" "}
                          {errors.lastName?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="form-group row">
                <label className="form-label">Email address : </label>
                <input
                  type="email"
                  className="form-control form-control-rounded mb-2"
                  name="email"
                  placeholder="E-mail adress"
                  ref={register}
                />
                {errors.email && (
                  <div class="alert alert-danger" role="alert">
                    <div class="d-flex">
                      <div>
                        <div class="text-muted"> {errors.email?.message}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="form-group row">
                <label className="form-label">Password : </label>
                <input
                  type="password"
                  className="form-control form-control-rounded mb-2"
                  name="password"
                  placeholder="password"
                  ref={register}
                />
                {errors.password && (
                  <div class="alert alert-danger" role="alert">
                    <div class="d-flex">
                      <div>
                        <div class="text-muted">
                          {" "}
                          {errors.password?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="form-group row">
                <label className="form-label"> Repeat your password : </label>
                <input
                  type="password"
                  className="form-control form-control-rounded mb-2"
                  name="repeatedPassword"
                  placeholder="repeat your password"
                  ref={register}
                />
                {errors.repeatedPassword && (
                  <div class="alert alert-danger" role="alert">
                    <div class="d-flex">
                      <div>
                        <div class="text-muted">
                          {errors.repeatedPassword?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
            <div className="card-footer text-center">
              <button className="btn btn-primary" form="register">
                Create Account
              </button>
              <div>
                <Link to="/"> Already have one ? </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
