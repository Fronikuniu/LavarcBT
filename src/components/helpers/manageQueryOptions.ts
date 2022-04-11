import {
  QueryConstraint,
  where,
  WhereFilterOp,
  FieldPath,
  orderBy,
  limit,
  query,
  collection,
  Query,
} from 'firebase/firestore';
import { db } from '../configuration/firebase';

export interface OptionsProps {
  whereArg?: [string, WhereFilterOp, string | number | boolean | string[]];
  orderByArg?: [string | FieldPath, 'asc' | 'desc'];
  limitArg?: number;
}

export const manageQueryOpinions = (
  coll: string,
  queryOptions: OptionsProps,
  collOptions?: string[]
) => {
  const queryArgs: QueryConstraint[] = [];

  if (queryOptions.whereArg) {
    const whereParams = where(
      queryOptions.whereArg[0],
      queryOptions.whereArg[1],
      queryOptions.whereArg[2]
    );
    queryArgs.push(whereParams);
  }
  if (queryOptions.orderByArg) {
    const orderByParams = orderBy(queryOptions.orderByArg[0], queryOptions.orderByArg[1]);
    queryArgs.push(orderByParams);
  }
  if (queryOptions.limitArg) {
    const limitParams = limit(queryOptions.limitArg);
    queryArgs.push(limitParams);
  }

  let q: Query;
  if (collOptions) q = query(collection(db, coll, ...collOptions), ...queryArgs);
  else q = query(collection(db, coll), ...queryArgs);

  return q;
};
