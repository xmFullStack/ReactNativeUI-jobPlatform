export const serverUrlValidator = server => {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  
  if (!server || server.length <= 0) return 'Server url cannot be empty.';
  if (!pattern.test(server)) return 'Invalid server url!  We need a valid server address.';

  return '';
};

export const companyCodeValidator = companyCode => {
  if (!companyCode || companyCode.length <= 0) return 'Company code cannot be empty.';

  return '';
};

export const cardIdValidator = cardId => {
  if (!cardId || cardId.length <= 0) return 'Company code cannot be empty.';

  return '';
};

export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = pin => {
  if (!passwordValidator || passwordValidator.length <= 0) return 'Password cannot be empty.';

  return '';
};
