import SectionHeading from '../../components/SectionHeading'

const SecPartners = ({data, onApply, isAuthenticated, account}) => {

  return (
    <section className="partners">

        <SectionHeading
            title='ADXX is live on 4 Chains'
            text='Use the DAPP Seamlessly Across 4 Different Blockchains Simply By Connecting Your Wallet to the Desired Network!'
        />

        <div className="container">
            <div className="row">
                {data && data.map((item , key) => (
                    <div className="col-lg-3 col-sm-6" key={key}>
                        <div className="partner-box">
                            <img src={item.img} alt="" className="center-bock" style={{ width: 64, height: 64 }} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="row" style={{ justifyContent: 'center' }}>
            {isAuthenticated && account && (
                <a onClick={onApply} className="btn dream-btn mr-3">Apply Now</a>
                
            )}
            </div>
        </div>
    </section>
  );
}

export default SecPartners;