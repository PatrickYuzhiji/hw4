const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <h5>{props.major}</h5>
        <p>{props.name.first} is taking {props.numCredits} credits {props.fromWisconsin ? "and is from" : "and is not from"} Wisconsin.</p>
        <p>They have {props.interests.length} interest(s) including...</p>
        {props.interests.length > 0 && (
            <ul>
                {props.interests.map((interest) => (
                    <li key={interest}>{interest}</li>
                ))}
            </ul>
        )}
    </div>
}

export default Student;