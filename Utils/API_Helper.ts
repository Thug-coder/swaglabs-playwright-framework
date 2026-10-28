export async function formatAPIRequest(template: string, values: any[]): Promise<string> {
    return template.replace(/{(\d+)}/g, (match, p1) => {
        const index = parseInt(p1, 10);
        return index < values.length ? String(values[index]) : match;
    });
}

export async function getPostRequestBody(fname: string, lname: string, tPrice: number, depositpaid: boolean, checkin: string, checkout: string, additionalneeds: string) {

    const apiRequest: BookingAPI = {
        firstname: fname,
        lastname: lname,
        totalprice: tPrice,
        depositpaid: depositpaid,
        bookingdates: {
            checkin: checkin,
            checkout: checkout
        },
        additionalneeds: additionalneeds
    }
    return apiRequest
}