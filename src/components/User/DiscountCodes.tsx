import { useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { uid } from 'uid';
import { DiscountCode } from '../../types';
import useDocsSnapshot from '../helpers/useDocsSnapshot';
import { UseDeleteDoc, UseSetDoc } from '../helpers/useManageDoc';

function DiscountCodes() {
  const { data: allCodes } = useDocsSnapshot<DiscountCode>('discountCodes', [], {});
  const { register, handleSubmit, reset } = useForm<DiscountCode>();

  const onSubmit = async ({ code, discount }: DiscountCode) => {
    const id = uid(15);
    await UseSetDoc('discountCodes', [id], {
      doc_id: id,
      code,
      discount,
    });
    toast.success('Added new discount code!');
    reset();
  };

  return (
    <details>
      <summary>Manage discount codes</summary>
      <div className="discount-codes__add">
        <p>Add discount code</p>
        <form onSubmit={handleSubmit(onSubmit)} className="discount-form">
          <input type="text" placeholder="Code name" {...register('code', { required: true })} />
          <input
            type="number"
            placeholder="Discount"
            {...register('discount', { required: true, max: 100, min: 1 })}
          />

          <input type="submit" />
        </form>

        <p>Discount codes table:</p>
        <div className="codes-table">
          {allCodes.map((code) => (
            <div className="item" key={code.code}>
              <p className="name">
                {code?.code} - {code?.discount}%
              </p>
              <IoClose
                className="close pointer"
                onClick={() => UseDeleteDoc('discountCodes', [code.doc_id])}
                title="Delete code"
              />
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}

export default DiscountCodes;
