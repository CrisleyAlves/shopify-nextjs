import { ReadonlyURLSearchParams } from "next/navigation";

export function ensureStartWith(stringToCheck: string, startWith: string) {
  return stringToCheck.startsWith(startWith)
    ? stringToCheck
    : `${startWith}${stringToCheck}`;
}

export function createUrl(
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
}

const buildUrlSearchParamByFieldName = (
  urlSearchParams: URLSearchParams,
  paramName: string,
  paramValue: string
) => {
  if (paramValue) {
    urlSearchParams.set(paramName, paramValue);
  } else {
    urlSearchParams.delete(paramName);
  }

  return urlSearchParams;
};

export function buildSortingParams(
  pathname: string,
  searchParams: URLSearchParams,
  value: string
): string {
  const newParams = buildUrlSearchParamByFieldName(
    new URLSearchParams(searchParams.toString()),
    "sort",
    value
  );
  return createUrl(pathname, newParams);
}

export function buildQueryStringParams(
  pathname: string,
  searchParams: URLSearchParams,
  value: string
): string {
  const newParams = buildUrlSearchParamByFieldName(
    new URLSearchParams(searchParams.toString()),
    "q",
    value
  );
  return createUrl(pathname, newParams);
}
