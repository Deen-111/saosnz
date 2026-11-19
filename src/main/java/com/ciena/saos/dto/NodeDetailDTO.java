//package com.ciena.saos.dto;
//
//import java.io.Serializable;
//import java.util.List;
//
//import com.ciena.saos.entity.NodeDetail;
//
//import lombok.Data;
//
//@Data
//public class NodeDetailDTO implements Serializable {
//
//	private static final long serialVersionUID = 1L;
//
//	private List<NodeDetail> nodeDetail;
//	private boolean isLastPage;
//}

package com.ciena.saos.dto;

import com.ciena.saos.entity.NodeDetail;

import java.io.Serializable;
import java.util.List;

public record NodeDetailDTO(List<NodeDetail> nodeDetail, boolean isLastPage) implements Serializable {
}