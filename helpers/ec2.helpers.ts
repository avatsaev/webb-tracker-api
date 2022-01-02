const META_DATA_URL = "http://169.254.169.254/latest/meta-data";

export const getInstanceId = async () => {
    return fetch(`${META_DATA_URL}/instance-id`)
        .then(res => res.text())
        .catch(err => {
            console.error(err);
            return "";
        });
};
