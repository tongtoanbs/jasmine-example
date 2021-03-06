describe("Employees of <XYZ> Company:", function () {
    describe('TAX/TDS Currency', function () {
        var index = 0;
        var myRegion, myCurrency;
        beforeEach(function () {
            myRegion = ['INDIA', 'UK', 'US'];
            myCurrency = new Currency(myRegion[index]);
        });
        afterEach(function () {
            index += 1;
        });
        //Scenario -1
        it('Currency should be used INR', function () {
            expect(myCurrency.currency).toBe('INR');
        });
        //Scenario -2
        it('Currency should be used GBP (Pound, UK£)', function () {
            expect(myCurrency.currency).toBe('UK£');
        });
        //Scenario -3
        it('Currency should be used USD (US$)', function () {
            expect(myCurrency.currency).toBe('US$');
        });
    });
    describe('TAX/TDS', function () {
        describe('Tax deducted for Indian Employees, ', function () {
            var index = 0;
            var grossTaxableIncome = [300000, 700000, 1300000];
            var myTaxableIncome;
            beforeEach(function () {
                myTaxableIncome = new TaxIndiaEmp();
                myTaxableIncome.setIncome(grossTaxableIncome[index]);
            });
            afterEach(function () {
                index += 1;
            });

            //Scenario -4
            it('Should be duducted 10% if Gross Income is between RS 250,000/- AND RS 500,000/-', function () {
                //Let's assume the taxable income is RS 300,000/-
                expect(myTaxableIncome.calculateTDS()).toEqual(5000);
            });
            //Scenario -5
            it('Should be deducted 20% if Gross Income is between RS 500,000/- and RS 1,000,000/-', function () {
                //Let's assume the taxable income is RS 700,000/-
                expect(myTaxableIncome.calculateTDS()).toEqual(40000);
            });
            //Scenario -6
            it('Should be deducted 30% if Gross Income is >RS 10,000,00/-', function () {
                expect(myTaxableIncome.calculateTDS()).toEqual(90000);
            });
        });
    });
});