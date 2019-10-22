/* istanbul ignore file */
/* eslint-disable */
import { mount } from 'enzyme';
import React, { Profiler } from 'react';


const executor = ({ Component }) => new Promise((resolve, reject) => {
    const onRender = (id, phase, actual) => {
        resolve(actual);
    };

    mount(
        <Profiler id={'internalId'} onRender={onRender}>
            <Component/>
        </Profiler>,
    );
});
export default async ({ repititions = 5, ...rest }) => {
    const first = await executor(rest); let
        total = 0;
    for (let i = 0; i < repititions; i++) {
        const result = await executor(rest);
        total += result;
    }
    return {
        repititions,
        first,
        avg: total / repititions,
    };
};
