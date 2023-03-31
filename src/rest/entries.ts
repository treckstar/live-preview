import { EntryProps, ContentTypeProps } from 'contentful-management/types';

import { SysProps, Entity } from '../types';

const mergeFields = (initialObj: any, updatedObj: any, locale: string) => {
  const mergedObj = { ...initialObj };

  console.log({ initialObj, updatedObj });

  for (const field in updatedObj.fields) {
    mergedObj.fields[field] = updatedObj.fields[field][locale];
  }

  return mergedObj;
};

/**
 * Updates REST response data based on CMA entry object
 *
 *  @param contentType ContentTypeProps
 * @param data Entity - The REST response to be updated
 * @param update EntryProps - CMA entry object containing the update
 * @param locale string - Locale code
 * @returns Entity - Updated REST response data
 */
export function updateEntry(
  contentType: ContentTypeProps,
  data: (Entity & { sys: SysProps }) | Array<Entity & { sys: SysProps }>,
  update: EntryProps,
  locale: string
): (Entity & { sys: SysProps }) | Array<Entity & { sys: SysProps }> {
  const modified = { ...data };
  const { fields } = contentType;

  console.log({ fields });

  // Check if 'data' is an array
  if (Array.isArray(data)) {
    // Create a new array based on the original 'data' array
    const newArray = [...data];

    // Find the object with the same sys.id as the 'updated' object
    const index = newArray.findIndex((item) => item.sys.id === update.sys.id);

    // check if an element with a matching sys.id was found in the initial array
    if (index !== -1) {
      // Update the fields of the object found in the 'newArray' using the content from the 'updated' object
      newArray[index] = mergeFields(newArray[index], update, locale);
      return newArray;
    }
  } else {
    // If 'initial' is an object, update its fields using the content from the 'updated' object
    if (data.sys.id === update.sys.id) {
      //update data
    }
    return data;
  }

  // for (const field of fields) {
  //   const name = field.apiName ?? field.name;

  //   if (isPrimitiveField(field)) {
  //     updatePrimitiveField(modified, update, name, locale);
  //   } else if (field.type === 'RichText') {
  //     updateRichTextField(modified, update, name, locale);
  //   } else if (field.type === 'Link') {
  //     updateSingleRefField(modified, update, name, locale, entityReferenceMap);
  //   } else if (field.type === 'Array' && field.items?.type === 'Link') {
  //     updateMultiRefField(modified, update, name, locale, entityReferenceMap);
  //   }
  // }

  return modified;
}
