import {  useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { PORTAL_ERROR_MSG } from '../../constants/constants';

type ContainerOptions = {
    id: string;
    mountNode?: HTMLElement;
}

type PortalOptions = {
    id: string;
    children: ReactNode;
}

const createContainer = (options: ContainerOptions) => {
    if (document.getElementById(options.id)) return;

    const { id, mountNode = document.body } = options;

    const portalContainer = document.createElement('div');

    portalContainer.setAttribute('id', id);
    mountNode.appendChild(portalContainer);
}

const Portal = ({ id, children }: PortalOptions) => {
    const [container, setContainer] = useState<HTMLElement>();

    useEffect(() => {
        if (id) {
            const portalContainer = document.getElementById(id);

            if (!portalContainer) {
                throw new Error(PORTAL_ERROR_MSG);
            }

            setContainer(portalContainer);
        }
    }, [id]);

    return container ? createPortal(children, container) : null;
 }

export { createContainer };
export default Portal;