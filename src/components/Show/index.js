import React, { useState, useEffect } from 'react'
import firebase from '../firebase'

function Show(props) 
{
    const [quotes, setQuotes] = useState([]);

    useEffect(() =>
    {
        firebase.getAllQuotes().then(setQuotes);
    }, [firebase.getAllQuotes()]);

    return (
        <div>
            <h1>{props.match.params.username}</h1>
            {/*{quotes.map((quote, index) =>
                <div key={index}>
                    {quote.user === props.match.params.username ?
                        <>
                            <h1>{quote.quote}</h1>
                            <h3>{quote.user}</h3>
                        </>
                    : null}
                </div>
            )}*/}
        </div>
    )
}

export default Show
