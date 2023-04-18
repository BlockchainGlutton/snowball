import SectionHeading from "../../../components/SectionHeading";
import Form from "./Form";

const SecContact = () => {
  return (
    <div className="contact_us_area" id="contact">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SectionHeading
              title="Our best resources. Right in your Box."
              text=""
              // text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo."
            />
            <p data-aos="fade-up" data-aos-delay="400">
              Join our mailing list for updates on newly Verified projects, new
              features of the dApp, and new services from AnonyDoxx.
            </p>
          </div>
        </div>
        <Form />
      </div>
    </div>
  );
};

export default SecContact;
