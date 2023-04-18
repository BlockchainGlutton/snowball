import SecWhoWeContant from "./SecWhoWeContant";
import SecWelcomeMeter from "./SecWelcomeMeter";

const SecAboutUs = ({ img }) => {
  return (
    <section className="about-us-area clearfix">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <SecWhoWeContant />
        </div>
      </div>
    </section>
  );
};

export default SecAboutUs;
