// Firebase
import { db, auth } from "../firebase/firebase-config";
import { collection, onSnapshot, getDocs, addDoc, query, limit, orderBy, doc, getDoc, setDoc  } from "firebase/firestore"
import { useState, useEffect } from "react";

function ArrayTareas() {
    return (
        <div>
            {
                arrayTareas.map((objetoTarea) => {
                    return (
                        <div>
                            <p>{objetoTarea.descripcion}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ArrayTareas;