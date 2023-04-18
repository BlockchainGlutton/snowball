const Li_A = ({nameIco, url}) => <li><a href={url}><i className={nameIco} aria-hidden="true"></i></a></li>

const SecVerticalSocial = ({data}) => {

  return (
    <div className="vertical-social">
        <ul>
            {data && data.map((item ,  key) => (
                    <Li_A nameIco={item.nameIco} url={item.url} key={key} />
                ))
            }
            
        </ul>                  
    </div>
  );
}

export default SecVerticalSocial;