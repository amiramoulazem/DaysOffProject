import * as yup from "yup";

import { Link } from "react-router-dom";
import { Notyf } from "notyf";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});
function Login() {
  const history = useHistory();
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
    Meteor.loginWithPassword(data.email, data.password, (error) => {
      if (error) {
        notyf.error({ message: "unable to login. check email or password" });
      }

      history.push("/dashboard");
    });
  };

  return (
    <div>
      <div className="container full-height">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h1 className="card-title h3 mb-0">Login : </h1>
              </div>
              <form
                className="card-body"
                id="login"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                              
                              {errors.password?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
              <div className="card-footer text-center ">
                <button className="btn btn-primary" form="login">
                  login
                </button>
                <div>
                  <Link to="/register"> Create Account </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
