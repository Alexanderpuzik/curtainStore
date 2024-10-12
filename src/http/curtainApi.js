import { $authHost, $host } from './index';

export const createType = async type => {
  const { data } = await $authHost.post('api/type', type);
  return data;
};

export const fetchType = async () => {
  const { data } = await $host.get('api/type/');
  return data;
};

export const createBrand = async brand => {
  const { data } = await $authHost.post('api/brand/', brand);
  return data;
};

export const fetchBrand = async () => {
  const { data } = await $host.get('api/brand/');
  return data;
};

export const fetchOneBrand = async id => {
  const { data } = await $host.get('api/brand/' + id);
  return data;
};

export const createCurtain = async curtain => {
  const { data } = await $authHost.post('api/curtain/', curtain, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const fetchCurtain = async (typeId, brandId, page, limit = 9) => {
  const { data } = await $host.get('api/curtain/', {
    params: { typeId, brandId, page, limit },
  });
  return data;
};

export const fetchOneCurtain = async id => {
  const { data } = await $host.get('api/curtain/' + id);
  return data;
};
