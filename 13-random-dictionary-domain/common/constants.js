const validTlds = ['com', 'org', 'net'];

const errorMessages = {
    400: 'Invalid Request: No valid TLDs were provided. The tld param accepts one or multiple of com|org|net in a comma-separated list.',
    404: 'No Domain Found: No available domain was found in this batch. Each request searches a maximum of 60 domains before aborting.',
    429: 'Unable to Continue: The rate limit of an RDAP endpoint was exceeded. Please try again later. (See https://about.rdap.org/ for more details)',
    500: 'Server Error: An unexpected error occurred. Please try again later.'
}

module.exports = { validTlds, errorMessages }