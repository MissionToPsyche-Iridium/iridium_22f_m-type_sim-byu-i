import Psyche_Mission_Logo from '../assets/Psyche_Mission_Logo.png'

const styles = theme => ({
    img: {}
})
function Logo() {

    return (

        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        }} >
            <img src={Psyche_Mission_Logo} alt="Psyche Mission Logo" />
        </div>
        
    );
}
export default Logo;
