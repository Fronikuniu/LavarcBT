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
import { Image, Member, Opinion, UserData } from '../../types';
import { db } from '../configuration/firebase';

type whereType = [
  keyof Opinion | keyof Member | keyof Image | keyof UserData,
  WhereFilterOp,
  string | number | boolean | string[]
];

type OrderType = [string | FieldPath, 'asc' | 'desc'];

export interface OptionsProps {
  whereArg?: whereType;
  secWhereArg?: whereType;
  orderByArg?: OrderType;
  secOrderByArg?: OrderType;
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
  if (queryOptions.secOrderByArg) {
    const orderByParams = orderBy(queryOptions.secOrderByArg[0], queryOptions.secOrderByArg[1]);
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
