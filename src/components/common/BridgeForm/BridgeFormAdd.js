import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addNewBridge, getAllBridges } from '../../../state/actions';

function BridgeFormAdd({ authState, changeShow }) {
  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  const onSubmit = data => {
    console.log('new bridge data:', data);
    dispatch(addNewBridge(data, authState.idToken));
    changeShow();
    dispatch(getAllBridges());
  };

  return (
    <>
      <h2>Adding New Bridge</h2> <hr></hr>
      <form onSubmit={handleSubmit(onSubmit)} className="add-form-cont-inner">
        {/* BRIDGE SITE NAME */}
        <label className="name">
          Bridge Site Name
          <input
            placeholder="Ex: Buzi"
            name="name"
            ref={register({ required: true })}
          />
        </label>
        {errors.name && (
          <h3 style={{ color: 'red' }}>This is a required field</h3>
        )}
        {/* PROJECT CODE */}
        <label className="p-code">
          Project Code
          <input
            placeholder="Ex: 1024"
            name="projectCode"
            ref={register({ required: true })}
          />
        </label>
        {errors.projectCode && (
          <h3 style={{ color: 'red' }}>This is a required field</h3>
        )}
        {/* PROJECT STAGE */}
        <label className="p-stage">
          Project Stage
          <select name="stage" id="stage" ref={register({ required: true })}>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Identified">Identified</option>
          </select>
        </label>
        {errors.stage && (
          <h3 style={{ color: 'red' }}>This is a required field</h3>
        )}
        {/* SUB STAGE */}
        <label className="sub-stage">
          Sub Stage
          <select
            name="subStage"
            id="subStage"
            ref={register({ required: true })}
          >
            <option value="Technical">Technical</option>
            <option value="Requested">Requested</option>
          </select>
        </label>
        {errors.subStage && (
          <h3 style={{ color: 'red' }}>This is a required field</h3>
        )}
        {/* LATITUDE */}
        <label className="lat">
          Latitude
          <input
            placeholder="Ex: -1234"
            name="latitude"
            type="number"
            ref={register({ required: true })}
          />
        </label>
        {errors.latitude && (
          <h3 style={{ color: 'red' }}>This is a required field</h3>
        )}
        {/* LONGITUDE */}
        <label className="lon">
          Longitude
          <input
            placeholder="Ex: 1234"
            name="longitude"
            type="number"
            ref={register({ required: true })}
          />
        </label>
        {errors.longitude && (
          <h3 style={{ color: 'red' }}>This is a required field</h3>
        )}
        {/* INDIVIDUALS SERVED */}
        <label className="served">
          Individuals Served
          <input
            placeholder="Ex: 240"
            name="individualsDirectlyServed"
            type="number"
            ref={register({ required: false })}
          />
        </label>
        {/* SPAN */}
        <label className="span">
          Span
          <input
            placeholder="Length in meters"
            name="span"
            type="number"
            ref={register({ required: false })}
          />
        </label>
        {/* TYPE */}
        <label className="b-type">
          Bridge Type
          <select name="type" id="type" ref={register({ required: true })}>
            <option value="Suspended">Suspended</option>
            <option value="Suspension">Suspension</option>
            <option value="Other">Other</option>
          </select>
        </label>
        {errors.type && (
          <h3 style={{ color: 'red' }}>This is a required field</h3>
        )}
        {/* COUNTRY */}
        <label className="country">
          Country
          <input
            placeholder="Ex: Rwanda"
            name="country"
            ref={register({ required: true })}
          />
        </label>
        {errors.country && (
          <h3 style={{ color: 'red' }}>This is a required field</h3>
        )}
        {/* PROVINCE */}
        <label className="province">
          Province
          <input
            placeholder="Ex: Western Province"
            name="province"
            ref={register({ required: true })}
          />
        </label>
        {errors.province && (
          <h3 style={{ color: 'red' }}>This is a required field</h3>
        )}
        {/* SECTOR */}
        <label className="sector">
          Sector
          <input
            placeholder="Ex: Giheke"
            name="sector"
            ref={register({ required: true })}
          />
        </label>
        {errors.sector && (
          <h3 style={{ color: 'red' }}>This is a required field</h3>
        )}
        {/* CELL */}
        <label className="cell">
          Cell
          <input
            placeholder="Ex: Gakomeye"
            name="cell"
            ref={register({ required: true })}
          />
        </label>
        {errors.cell && (
          <h3 style={{ color: 'red' }}>This is a required field</h3>
        )}
        {/* FORM NAME */}
        <label className="f-name">
          Form Name
          <input
            placeholder="Ex: Project Assessment - 2018.10.29"
            name="formName"
            ref={register({ required: true })}
          />
        </label>
        {errors.formName && (
          <h3 style={{ color: 'red' }}>This is a required field</h3>
        )}
        {/* CASE SAFE ID FORM */}
        <label className="CSIF">
          Case Safe ID Form
          <input
            placeholder="Ex: a1if1002ejd77"
            name="caseSafeIdForm"
            ref={register({ required: true })}
          />
        </label>
        {errors.caseSafeIdForm && (
          <h3 style={{ color: 'red' }}>This is a required field</h3>
        )}
        {/* BRIDGE OPPORTUNITY ID */}
        <label className="BOI">
          Bridge Opportunity Name
          <input
            placeholder="Ex: 0067kaf894a"
            name="bridgeOpportunityId"
            ref={register({ required: true })}
          />
        </label>
        {errors.bridgeOpportunityId && (
          <h3 style={{ color: 'red' }}>This is a required field</h3>
        )}
        {/* SUBMIT */}
        <input className="submit" type="submit" />
      </form>
    </>
  );
}

export default BridgeFormAdd;
