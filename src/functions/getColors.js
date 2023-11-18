export function getColors (/** @type { string[] } */ labels) {
    let totalColors = ['rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
    ];
    let colors = [];

    let j = 0;
    for (let i = 0; i < labels.length; i++){
        if (j === totalColors.length){
            j = 0;
            colors.push(totalColors[j]);
            j++;
        }
        else {
            colors.push(totalColors[j]);
            j++;
        }
    }

    return colors;
}
