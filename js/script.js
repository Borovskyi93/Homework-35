const userData = {
	USD: 1000,
	EUR: 900,
	UAH: 15000,
	BIF: 20000,
	AOA: 100
};

const bankData = {
    USD: {
        max: 3000,
        min: 100,
        img: '💵'
    },
    EUR: {
        max: 1000,
        min: 50,
        img: '💶'
    },
    UAH: {
        max: 0,
        min: 0,
        img: '💴'
    },
    GBP: {
        max: 10000,
        min: 100,
        img: '💷'
    }
}

const getMoney = (userData, bankData) => {
    return new Promise (function(resolve, reject) {
        const showBalance = confirm('Подивитись баланс карти?');

        showBalance ? resolve(userData) : reject(userData, bankData);
    })
}

const getMoneyPromise = getMoney(userData, bankData);

getMoneyPromise
    .then(
        function() {
            let inputUserCurrency;

            do {
                inputUserCurrency = prompt('Введіть бажану валюту:');
            } while (!userData.hasOwnProperty([inputUserCurrency]));

            return inputUserCurrency;
        },
        function() {
            let inputCurrency;
    
            do {
                inputCurrency = prompt('Введіть валюту, яку хочете зняти:');
            } while (!userData.hasOwnProperty([inputCurrency]) || !bankData.hasOwnProperty([inputCurrency]) || bankData[inputCurrency].max === 0);

            return Promise.reject(inputCurrency)
        }
    )
    .then(
        function(inputUserCurrency) {
            console.log(`Баланс становить: ${userData[inputUserCurrency]} ${inputUserCurrency}`);
        },
        function(inputCurrency) {
            const inputCash = +prompt('Введіть суму зняття готівки:');

            return new Promise((resolve, reject) => {
                const finalResult = `От Ваші гроші: ${inputCash} ${inputCurrency} ${bankData[inputCurrency].img}`;

                const isBigger = inputCash > userData[inputCurrency] && inputCash > bankData[inputCurrency].max;
                const isSmaller = inputCash < bankData[inputCurrency].min;

                if (isBigger) {
                    console.log(`Введена сума більша за доступну. Максимальна сума зняття: …`);
                    return;
                };
                if (isSmaller) {
                    console.log(`Введена сума менша за доступну. Мінімальна сума зняття: … `);
                    return;
                };

                inputCash ? resolve(finalResult) : reject();
            })
        }
    )
    .then((finalResult) => {
        finalResult ? console.log(finalResult) : Promise.finally;
    }, () => {
        console.error('Wrong DATA: NaN');
    },
    )
    .finally(
        setTimeout(() => {
            console.log('Дякую, гарного дня 😊')
        }, 1000)
    )
    




    // console.log(`Введена сума більша за доступну. Максимальна сума зняття: …`);
    // console.log(`Введена сума менша за доступну. Мінімальна сума зняття: … `);