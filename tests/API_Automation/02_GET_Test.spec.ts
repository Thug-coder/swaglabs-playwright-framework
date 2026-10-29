import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';
import { getPostRequestBody } from '../../Utils/API_Helper';

test.use({baseURL: process.env.BASE_API_URL ?? 'https://restful-booker.herokuapp.com'})

test('Create GET API Request', async ({request}) => {

    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 100, max: 10000 });

    const postAPIRequest = await getPostRequestBody(firstname, lastname, totalPrice, true, "2025-01-25", "2025-01-27", "breakfast")

    const postResponse = await request.post('/booking', {data: postAPIRequest})
    
    const jsonPostResponse = await postResponse.json();

    //use actual response for this assertions
    expect(postResponse.status()).toBe(200);
    expect(postResponse.statusText()).toBe('OK');
    expect(postResponse.headers()['content-type']).toContain('application/json');

    //use after converting to Json
    expect(jsonPostResponse.booking).toHaveProperty('firstname');
    expect(jsonPostResponse.booking).toHaveProperty('lastname');

    expect(jsonPostResponse.booking.bookingdates).toHaveProperty('checkin');
    expect(jsonPostResponse.booking.bookingdates).toHaveProperty('checkout');

    expect(jsonPostResponse.bookingid).toBeGreaterThan(0);

    expect(jsonPostResponse.booking.firstname).toBe(firstname);
    expect(jsonPostResponse.booking.lastname).toBe(lastname);

    console.log('Post call response is ' +JSON.stringify(jsonPostResponse, null, 2))

    const bookingIdFromPostResponse = jsonPostResponse.bookingid

    const getResponse = await request.get(`booking/${bookingIdFromPostResponse}`)

    const jsonGetResponse = await getResponse.json();
    console.log('Get call response is ' +JSON.stringify(jsonGetResponse, null, 2));

    expect(getResponse.status()).toBe(200);
    expect(getResponse.statusText()).toBe('OK');

    console.log('Get call response is ' +JSON.stringify(jsonGetResponse, null, 2));
    
})