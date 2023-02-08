module.exports = {
    roll_dice(size) {
        const result = Math.floor(Math.random() * size + 1);
        return `used a(n) ${size} faced dice. The result is ${result} !`;
    },
};