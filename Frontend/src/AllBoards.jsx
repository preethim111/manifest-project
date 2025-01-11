import Header from "./Header";
import { auth } from './firebase';
import { useState, useEffect } from 'react'

function AllBoards() {
    const [fullNameDisplay, setFullNameDisplay] = useState('');

    useEffect(() => {
        const user = auth.currentUser;

        if (user) {
            setFullNameDisplay(user.displayName)
        }
    }, [])

    return (
        <>
            <Header />
            <div style={{ fontSize: '15px', fontFamily: 'Lausanne', color: '#000000', paddingRight: '527px', marginBottom: '40px', fontWeight: 'bold' }}>
                <Header />
                {fullNameDisplay && <h1>{fullNameDisplay}'s Vision Boards</h1>}  
            </div>
        </>
    )
}

export default AllBoards;