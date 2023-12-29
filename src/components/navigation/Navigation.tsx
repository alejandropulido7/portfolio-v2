import "./Navigation.css"
import MenuGlobal from './MenuGlobal';
import { ShowNavContext } from "../../context/global/GlobalContext";
import { useContext } from "react";
import { links } from '../../content/Links'
import { NavLink, useLocation} from "react-router-dom";
import { contact } from "../../content/Contact";
import iconHome from '../../assets/images/home-svgrepo-com.svg'

export default function Navigation({dimensions}) {

    const {showNav, toggleShowNav} = useContext(ShowNavContext);
    const path = useLocation().pathname.split('/')[1];
    let pathName = null;
    let showBreadcrumb = true;
    const linkEmail = 'mailto: '+contact.email;
    const showLinks = links.filter( link => link.show);

    if(path) {
        showBreadcrumb = false;
        pathName = links.find((link) => link.link === path).name
    }
    

    return (
        <>
            <nav className="site-navigation relative site-container w-full m-auto">
                <div className="md:hidden site-navigation-inner fixed top-7">
                    <MenuGlobal show={showNav} />
                    <div id="myBtn" className={showNav ? "burger-container change" : "burger-container"} onClick={() => toggleShowNav(!showNav)}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>                    
                </div>
                <div className="breadcrumbs">
                    <Breadcrumbs show={showBreadcrumb} pathName={pathName} dimensions={dimensions}/>                
                </div>
                <ul className="section-contact fixed flex flex-col gap-5" style={{right: '7%'}}>
                    <li className="w-px h-20 bg-white self-center"></li>
                    <li className="hover:-translate-x-3 transition cursor-pointer"><a href={contact.git.link} target="_blank"><img src={contact.git.icon}/></a></li>
                    <li className="hover:-translate-x-3 transition cursor-pointer hover:fill-primary"><a href={contact.linkedin.link} target="_blank"><img src={contact.linkedin.icon}/></a></li>
                    <li className="contact-email text-white text-xl transition hover:text-primary"><a href={linkEmail}>{contact.email}</a></li>
                </ul>
                {
                    dimensions.width >= 725 &&                 
                    <ul className="flex fixed flex-col justify-center my-5 text-white gap-7 text-lg font-bold" style={{top: dimensions.height-250}}>
                        {
                            showLinks.map((link) => {
                                if(link.link === path) return null
                                return (
                                    <li key={link.link}>
                                        <NavLink to={link.link} 
                                        className={'uppercase relative flex items-center hover:translate-x-4 hover:text-primary transition duration-300 ease-in-out'}>    
                                            <span className="line-link"></span>                                    
                                            <span className="flex gap-6 items-center">{link.name}</span>
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
            </nav>
        </>
    )
}

function Breadcrumbs({show, pathName, dimensions}){
    if(show) return null
    return (
        <>
            <ul className="fixed flex flex-row gap-5 top-20 transition duration-300 ease-in-out">
                <li className="text-white uppercase text-lg font-bold">{pathName}</li>
                <li className="w-80 h-px bg-white self-center"></li>
            </ul>
            <div className="btn-home fixed right-0 my-5" style={{right: '7%', top: dimensions.height-100}}>
                <NavLink to={'/'}>
                    <img src={iconHome} alt="icon home"/>
                </NavLink>
            </div>        
        </>
    )
}