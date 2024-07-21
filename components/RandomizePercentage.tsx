const RandomizePercentage = () => {
    
    const randomDecimal = Math.random();
    const randomPercentage = Math.floor( randomDecimal * (95 - 5 + 1) + 5 );

    return randomPercentage;
}

export default RandomizePercentage;