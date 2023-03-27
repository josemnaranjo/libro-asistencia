import {React, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getAllTrabajadoresOfAJornada} from '../services/trabajador.services.js';
import {Formik,Field, Form} from 'formik'

const Hoy = () => {

    
    const [trabajadoresInfo, setTrabajadoresInfo] = useState([]);
    const [jornadaInfo, setJornadaInfo] = useState([]);
    const {date} = useParams();

    const getAllTrabajadoresFromService = async()=>{
        try{
            const response = await getAllTrabajadoresOfAJornada(date);
            setTrabajadoresInfo(response.data.trabajadoresInfo);
            setJornadaInfo(response.data.jornadaInfo);
        }catch(err){
            console.log(err)
        }
    };

    useEffect(() => {
        getAllTrabajadoresFromService();
    }, []);
    
    return (
        <div>
            <h1 className='text-center text-lg pt-3'>{date}</h1>

            <div className='mt-9'>
                <Formik>
                    <Form>
                        <div>
                            {
                                trabajadoresInfo?.map((trabajador)=>(
                                    <label>{trabajador.name}</label>
                                ))
                            }
                            
                            {
                                jornadaInfo?.map((jornada)=>(<label>{jornada.horaInicio}</label>))
                            }


                        </div>



                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Hoy;
