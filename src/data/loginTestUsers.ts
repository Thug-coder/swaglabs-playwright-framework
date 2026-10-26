export const validUser = {
  username: process.env.SAUCE_USERNAME ?? 'standard_user',
  password: process.env.SAUCE_PASSWORD ?? 'secret_sauce',
};

export const invalidPasswordUser = {
    username: 'standard_user',
    password: 'Invalid'
}

export const lockedoutUser = {
    username: 'locked_out_user',
    password: 'secret_sauce'
}

export const noCredsr = {
    username: '',
    password: ''
}
