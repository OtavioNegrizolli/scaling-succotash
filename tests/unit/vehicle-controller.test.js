import { describe, todo, it, mock } from 'node:test';
import assert from 'node:assert';
import { VehicleController } from '../../src/backend/controller/vehicle.controller.js';
import VehicleCreateCmd from '../../src/backend/cmd/vehicle-create.cmd.js';

describe('[Controller] Testing vehicle', () => {
    
    describe('[Creation]', (c) => {
        it('Should return data validation error', (t) => {
            // setup
            const cmd = new VehicleCreateCmd();
            cmd.plate = null;
            cmd.height = null;
            cmd.length = null;
            cmd.width = null;
            cmd.wieght = null;
            const fns = [
                t.mock.fn,
                t.mock.fn,
                t.mock.fn,
                t.mock.fn,
                t.mock.fn
            ];
            const subject = new VehicleController({
                insert: fns[0],
                update: fns[1],
                delete: fns[2],
                select: fns[3],
                selectById: fns[4]
            });
            console.log(fns[0].caller);
            // act 
            const result = subject.create(cmd);
            // // expe
            // for (const fn of fns) {
            //     fn.callCount()
            // }
        });
    });
    todo('get a vehicle');
    todo('update a vehicle');
    todo('delete a vehicle');
    todo('list vehicles');
});
