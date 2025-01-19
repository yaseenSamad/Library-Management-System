import Logo from "../assets/Logo.png";

const LogoComponent = () => {
  return (
    <div className="loginmain ms-3  ">
      <div className="loginhead d-flex gap-3 align-content-center">
        <img className="logologin mt-1" src={Logo} alt="logo" />
        <h1 className="logologintext mt-3 mb-0">LMS</h1>
      </div>
    </div>
  );
};

export default LogoComponent;
