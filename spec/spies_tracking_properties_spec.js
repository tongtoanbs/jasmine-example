describe('Jasmine Spies: ', function () {
    describe('Tracking Properties, ', function () {
        beforeEach(function () {
            this.testPersonCriteria = new Person2();
            spyOn(this.testPersonCriteria, 'getAge');
            spyOn(this.testPersonCriteria, 'checkHIV');
        });
        //Scenario 1 and 2
        describe('.calls.any() property ', function () {
            it('Should return \'false\' if spy is not called at all', function () {
                expect(this.testPersonCriteria.getAge.calls.any()).toEqual(false);
            });
            it("Should return 'true' if spy is called once", function () {
                this.testPersonCriteria.ValidateAge('10/25/1990');
                expect(this.testPersonCriteria.getAge.calls.any()).toEqual(true);
            });
        });
        //Scenario 3
        describe('.calls.count() property ', function () {
            it('should track the number of times the spy is called ', function () {
                expect(this.testPersonCriteria.getAge.calls.count()).toEqual(0);
                this.testPersonCriteria.ValidateAge('10/25/1990');
                this.testPersonCriteria.ValidateAge('10/25/1990');
                expect(this.testPersonCriteria.getAge.calls.count()).toEqual(2);
            });
        });
        //Scenario 4
        describe('.calls.argsFor(index) property ', function () {
            it('should return the argument(s) corresponding to each call', function () {
                this.testPersonCriteria.ValidateHIV('Name1', '10/25/1990', 'B+'); //Call 1
                this.testPersonCriteria.ValidateHIV('Name2', '10/25/1990', 'B+'); //Call 2
                this.testPersonCriteria.ValidateHIV('Name3', '10/25/1990', 'B+'); //Call 3
                expect(this.testPersonCriteria.checkHIV.calls.argsFor(0)).toEqual(['Name1', '10/25/1990', 'B+']);
                expect(this.testPersonCriteria.checkHIV.calls.argsFor(1)).toEqual(['Name2', '10/25/1990', 'B+']);
                expect(this.testPersonCriteria.checkHIV.calls.argsFor(2)).toEqual(['Name3', '10/25/1990', 'B+']);
            });
        });
        //Scenario 5
        describe('.calls.allArgs() property ', function () {
            it('should return the arguments for all return the arguments ', function () {
                this.testPersonCriteria.ValidateHIV('Name1', '10/25/1990', 'B+'); // Calll 1
                this.testPersonCriteria.ValidateHIV('Name2', '10/25/1990', 'B+'); // Calll 2
                this.testPersonCriteria.ValidateHIV('Name3', '10/25/1990', 'B+'); // Calll 3
                expect(this.testPersonCriteria.checkHIV.calls.allArgs()).toEqual([['Name1', '10/25/1990', 'B+'], ['Name2', '10/25/1990', 'B+'], ['Name3', '10/25/1990', 'B+']])
            });
        });
        //Scenario 6
        describe('.calls.mostRecent() property ', function () {
            it('should return the context (the this) and arguments for the most recent call', function () {
                this.testPersonCriteria.ValidateHIV('Name1', '10/25/1990', 'B+'); // Call 1
                this.testPersonCriteria.ValidateHIV('Name2', '10/25/1990', 'B+'); // Call 2
                expect(this.testPersonCriteria.checkHIV.calls.mostRecent()).toEqual({
                    object: this.testPersonCriteria,
                    args: ['Name2', '10/25/1990', 'B+'],
                    returnValue: undefined
                });
                expect(this.testPersonCriteria.checkHIV.calls.mostRecent().object).toBe(this.testPersonCriteria);
            });
        });
        //Scenario 7
        describe('.calls.First() property ', function () {
            it('should return the context (the this) and arguments for the first call', function () {
                this.testPersonCriteria.ValidateAge('10/25/1990'); // Call 1
                this.testPersonCriteria.ValidateAge('11/20/1988'); // Call 2
                expect(this.testPersonCriteria.getAge.calls.first()).toEqual({
                    object: this.testPersonCriteria,
                    args: ['10/25/1990'],
                    returnValue: undefined
                });
                expect(this.testPersonCriteria.getAge.calls.first().object).toBe(this.testPersonCriteria);
            });
        });
        //Scenario 8
        describe('.calls.reset() property ', function () {
            it('should clear all tracking for a spy', function () {
                this.testPersonCriteria.ValidateAge('10/25/1990');
                expect(this.testPersonCriteria.getAge.calls.any()).toEqual(true);
                this.testPersonCriteria.getAge.calls.reset();
                expect(this.testPersonCriteria.getAge.calls.any()).toBe(false);
            });
        });
    });
    describe('When to donate or receive blood, ', function () {
        describe('Person With O+ Blood Group: ', function () {
            it('can receive the blood of the person with O+ blood group', function () {
                var testPersonCriteria = new Person2('John Player', '10/30/1980', 'O+', 'Receiver');
                spyOn(testPersonCriteria, 'MatchBloodGroupToGiveReceive').and.callThrough();
                var callback = jasmine.createSpy();
                testPersonCriteria.ValidateBloodGroup(callback);
                //Verify, callback method is called or not
                expect(callback).toHaveBeenCalled();
                expect(callback.calls.any()).toEqual(true);
                expect(callback.calls.count()).toEqual(1);
                //Verify, MatchBloodGroupToGiveReceive is
                // call and check whether control goes back
                // to the function
                expect(testPersonCriteria.MatchBloodGroupToGiveReceive.calls.any()).toEqual(true);
                expect(testPersonCriteria.MatchBloodGroupToGiveReceive).toHaveBeenCalled();
                expect(testPersonCriteria.MatchBloodGroupToGiveReceive.calls.count()).toEqual(1);
                expect(testPersonCriteria.ValidateBloodGroup(callback)).toContain('O+');
            });
            it('can give the blood to the person with A+ blood group', function () {
                var testPersonCriteria = new Person2("John Player", "10/30/1980", "O+", "Donor");
                spyOn(testPersonCriteria, "MatchBloodGroupToGiveReceive").and.callThrough();
                var callback = jasmine.createSpy();
                testPersonCriteria.ValidateBloodGroup(callback);
                expect(callback).toHaveBeenCalled();
                expect(testPersonCriteria.MatchBloodGroupToGiveReceive).toHaveBeenCalled();
                expect(testPersonCriteria.ValidateBloodGroup(callback)).toContain("A+");
            });
        });
        describe('Person with B- blod group', function () {
            it('can receive the blood group', function () {
                var testPersonCriteria = new Person2('John Player', '10/30/1990', 'B-', 'Receiver');
                spyOn(testPersonCriteria, 'MatchBloodGroupToGiveReceive').and.callThrough();
                var callback = jasmine.createSpy();
                testPersonCriteria.ValidateBloodGroup(callback);
                expect(callback).toHaveBeenCalled();
                expect(testPersonCriteria.MatchBloodGroupToGiveReceive).toHaveBeenCalled();
                expect(testPersonCriteria.ValidateBloodGroup(callback)).toContain('B-');
            });
            it('can receive the blood of the person with O- blood group', function () {
                var testPersonCriteria = new Person2('John Player', '10/30/1980', 'B-', 'Receiver');
                spyOn(testPersonCriteria, 'MatchBloodGroupToGiveReceive').and.callThrough();
                var callback = jasmine.createSpy();
                testPersonCriteria.ValidateBloodGroup(callback);
                expect(callback).toHaveBeenCalled();
                expect(testPersonCriteria.MatchBloodGroupToGiveReceive).toHaveBeenCalled();
                expect(testPersonCriteria.ValidateBloodGroup(callback)).toContain('O-');
            });
        });
    });
});