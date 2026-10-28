import {test, expect} from '@playwright/test';
import postAPIRequest from '../../src/data/API_Test_Data/POST_API_Request.json';
import {formatAPIRequest} from '../../Utils/API_Helper';
import path from 'path';
import fs from 'fs';
import {faker} from '@faker-js/faker';
import { getPostRequestBody } from '../../Utils/API_Helper';

test.use({baseURL: process.env.BASE_API_URL ?? 'https://restful-booker.herokuapp.com'})

test('Post Endpoint Test by Reading Json File', async ({request}) => {
    const postResponse = await request.post('/booking', {data: postAPIRequest})
    const jsonPostResponse = await postResponse.json();

    expect(postResponse.status()).toBe(200);
    expect(postResponse.statusText()).toBe('OK');
    expect(postResponse.headers()['content-type']).toContain('application/json');

    expect(jsonPostResponse.booking).toHaveProperty('firstname');
    expect(jsonPostResponse.booking).toHaveProperty('lastname');

    expect(jsonPostResponse.booking.bookingdates).toHaveProperty('checkin');
    expect(jsonPostResponse.booking.bookingdates).toHaveProperty('checkout');

    expect(jsonPostResponse.bookingid).toBeGreaterThan(0);

    expect(jsonPostResponse.booking.firstname).toBe(postAPIRequest.firstname);
    expect(jsonPostResponse.booking.lastname).toBe(postAPIRequest.lastname);

    console.log('Post call response is ' +JSON.stringify(jsonPostResponse, null, 2))
});

test('Post Endpoint Test by Reading Json File and giving Dynamic Values', async ({request}) => {

    const filePath = path.join(__dirname, '../../src/data/API_Test_Data/POST_API_Request_Dynamic.json');
    const jsonTemplate = fs.readFileSync(filePath, 'utf-8');

    const values = ['Sahil', 'Shaikh', 20]
    const postApiBody = await formatAPIRequest(jsonTemplate, values)

    const postResponse = await request.post('/booking', {data: JSON.parse(postApiBody)})
    const jsonPostResponse = await postResponse.json();

    expect(postResponse.status()).toBe(200);
    expect(postResponse.statusText()).toBe('OK');
    expect(postResponse.headers()['content-type']).toContain('application/json');

    expect(jsonPostResponse.booking).toHaveProperty('firstname');
    expect(jsonPostResponse.booking).toHaveProperty('lastname');

    expect(jsonPostResponse.booking.bookingdates).toHaveProperty('checkin');
    expect(jsonPostResponse.booking.bookingdates).toHaveProperty('checkout');

    expect(jsonPostResponse.bookingid).toBeGreaterThan(0);

    expect(jsonPostResponse.booking.firstname).toBe(postAPIRequest.firstname);
    expect(jsonPostResponse.booking.lastname).toBe(postAPIRequest.lastname);

    console.log('Post call response is ' +JSON.stringify(jsonPostResponse, null, 2))
});

test('Post Endpoint Test by Reading Json File with Faker', async ({request}) => {

    const filePath = path.join(__dirname, '../../src/data/API_Test_Data/POST_API_Request_Dynamic.json');
    const jsonTemplate = fs.readFileSync(filePath, 'utf-8');

    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 100, max: 10000 });
    const values = [firstname, lastname, totalPrice]
    
    const postApiBody = await formatAPIRequest(jsonTemplate, values)

    const postResponse = await request.post('/booking', {data: JSON.parse(postApiBody)})
    const jsonPostResponse = await postResponse.json();

    expect(postResponse.status()).toBe(200);
    expect(postResponse.statusText()).toBe('OK');
    expect(postResponse.headers()['content-type']).toContain('application/json');

    expect(jsonPostResponse.booking).toHaveProperty('firstname');
    expect(jsonPostResponse.booking).toHaveProperty('lastname');

    expect(jsonPostResponse.booking.bookingdates).toHaveProperty('checkin');
    expect(jsonPostResponse.booking.bookingdates).toHaveProperty('checkout');

    expect(jsonPostResponse.bookingid).toBeGreaterThan(0);

    expect(jsonPostResponse.booking.firstname).toBe(firstname);
    expect(jsonPostResponse.booking.lastname).toBe(lastname);

    console.log('Post call response is ' +JSON.stringify(jsonPostResponse, null, 2))
});

test('Post Endpoint Test by Reading Json File with Faker with Interface', async ({request}) => {

    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 100, max: 10000 });

    const postAPIRequest = await getPostRequestBody(firstname, lastname, totalPrice, true, "breakfast", "2025-01-25", "2025-01-27")

    const postResponse = await request.post('/booking', {data: postAPIRequest})
    
    const jsonPostResponse = await postResponse.json();

    expect(postResponse.status()).toBe(200);
    expect(postResponse.statusText()).toBe('OK');
    expect(postResponse.headers()['content-type']).toContain('application/json');

    expect(jsonPostResponse.booking).toHaveProperty('firstname');
    expect(jsonPostResponse.booking).toHaveProperty('lastname');

    expect(jsonPostResponse.booking.bookingdates).toHaveProperty('checkin');
    expect(jsonPostResponse.booking.bookingdates).toHaveProperty('checkout');

    expect(jsonPostResponse.bookingid).toBeGreaterThan(0);

    expect(jsonPostResponse.booking.firstname).toBe(firstname);
    expect(jsonPostResponse.booking.lastname).toBe(lastname);

    console.log('Post call response is ' +JSON.stringify(jsonPostResponse, null, 2))
})