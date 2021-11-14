import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [valuesForm, onChangeValues ] = useForm({
        lEmail:'haru@gmail.com',
        lPassword:'123456',
    });

    const { lEmail, lPassword } = valuesForm;
    
    const onSubmit=(e)=>{
        e.preventDefault();
        /* console.log(valuesForm) */
        dispatch(startLogin(lEmail, lPassword))
    }
    
    return (
        <div className="login-form-2-main">
            <div className="login-form-1">
                <h3>Ingreso</h3>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Correo"
                            onChange={onChangeValues}
                            name="lEmail"
                            value={lEmail}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            onChange={onChangeValues}
                            name="lPassword"
                            value={lPassword}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="submit"
                            className="btnSubmit"
                            value="Login" 
                        />
                    </div>
                    <div>
                        <Link to="/register">Registrarse</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
