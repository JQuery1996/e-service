import { useAppDispatch } from "app/hooks";
import { RequestTemplate } from "components/templetes";
import { IDocumentType, IFullRequestInformation } from "core/types";
import { Loader } from "features/loader/Loader";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ReactAxios from "utils/axios";
import { useLoader } from "utils/hooks/useLoader";
import { useNavigate } from "react-router";
const GET_SPECIFIC_REQUEST_URL = process.env.REACT_APP_GET_SPECIFIC_REQUEST!;
const GET_DOCUMENT_TYPE_LIST_URL =
    process.env.REACT_APP_GET_DOCUMENT_TYPE_LIST!;

export default function Request() {
    const params = useParams();
    const [request, setRequest] = useState<IFullRequestInformation | null>(
        null,
    );
    const [documentTypeList, setDocumentTypeList] = useState<IDocumentType[]>(
        [],
    );
    const navigation = useNavigate();
    const dispatch = useAppDispatch();
    const { isLoading, setLoadingState } = useLoader();
    useEffect(() => {
        async function fetchRequest() {
            try {
                dispatch(setLoadingState(true));
                const responsedDocumentTypeList = await ReactAxios.get(
                    GET_DOCUMENT_TYPE_LIST_URL,
                );
                setDocumentTypeList(responsedDocumentTypeList.data.Data);
                const responsedRequest = await ReactAxios.get(
                    GET_SPECIFIC_REQUEST_URL + `/${params.id}`,
                );
                if (responsedRequest.data.Code === 400) navigation("/");
                setRequest(responsedRequest.data.Data);
                dispatch(setLoadingState(false));
            } catch (error) {
                dispatch(setLoadingState(false));
                console.log(error);
            }
        }
        fetchRequest();
    }, [dispatch, navigation, params.id, setLoadingState]);

    return (
        <>
            {isLoading && <Loader />}
            {request && (
                <RequestTemplate
                    request={request!}
                    documentTypeList={documentTypeList}
                />
            )}
        </>
    );
}
