import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css'

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [ valuesForm, onChangeValues ] = useForm({
        rName:'Marcos',
        rEmail:'marco@gmail.com',
        rPasswordOne:'123456',
        rPasswordTwo:'123456',
    })

    const {rName, rEmail, rPasswordOne, rPasswordTwo}=valuesForm;

    const handleRegister=(e)=>{
        e.preventDefault();

        if(rPasswordOne !== rPasswordTwo){
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error')
        }

        dispatch(startRegister(rEmail, rPasswordOne, rName));
    }

    return (
        <div className="login-form-2-main">
            <div className="login-form-2">
                <h3>Registro</h3>
                <form
                    onSubmit={handleRegister}
                >
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            name="rName"
                            value={rName}
                            onChange={onChangeValues}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            name="rEmail"
                            value={rEmail}
                            onChange={onChangeValues}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña" 
                            name="rPasswordOne"
                            value={rPasswordOne}
                            onChange={onChangeValues}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Repita la contraseña" 
                            name="rPasswordTwo"
                            value={rPasswordTwo}
                            onChange={onChangeValues}
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="submit" 
                            className="btnSubmit" 
                            value="Crear cuenta" />
                    </div>
                    <div>
                        <Link to="/login" style={{color:'white'}}>Loguearse</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
