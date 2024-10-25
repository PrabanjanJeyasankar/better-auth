import { Outlet } from 'react-router-dom'
import authStyles from './AuthenticationLayout.module.css'
import ClientAuthImage from '../../assets/images/client_auth.png'

function AuthenticationLayout() {
    return (
        <section className={authStyles.auth_layout}>
            <div className={authStyles.left_half}>
                <div className={authStyles.left_half_content}>
                    <div className={authStyles.header}>
                        <h3 className={authStyles.app_name}>Better Auth.</h3>
                        <p className={authStyles.app_tag_line}>
                            The most comprehensive authentication library.
                        </p>
                    </div>
                    <img
                        src={ClientAuthImage}
                        className={authStyles.code_image}
                        alt='auth client code image'
                    />
                </div>
            </div>
            <div className={authStyles.right_half}>
                <Outlet />
            </div>
        </section>
    )
}

export default AuthenticationLayout
